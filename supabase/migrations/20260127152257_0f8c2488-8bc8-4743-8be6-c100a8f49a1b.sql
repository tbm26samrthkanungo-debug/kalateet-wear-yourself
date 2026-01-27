-- Create product_images table for multiple images per product
CREATE TABLE public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product_variants table for size/stock management
CREATE TABLE public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(product_id, size)
);

-- Enable RLS
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

-- Public read access for product images and variants
CREATE POLICY "Product images are viewable by everyone" 
  ON public.product_images FOR SELECT USING (true);

CREATE POLICY "Product variants are viewable by everyone" 
  ON public.product_variants FOR SELECT USING (true);

-- Seed sample products matching the existing homepage display
INSERT INTO public.products (id, name, description, style, fabric, color, price_inr, image_url, is_featured)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Oversize Red', 'Deep maroon half kurta with V-neck - timeless elegance meets comfort', 'Chikankari', 'Premium cotton blend with natural breathability. Machine wash cold, tumble dry low.', 'Maroon', 3299, '/placeholder.svg', true),
  ('22222222-2222-2222-2222-222222222222', 'Olive Green Floral', 'Botanical print kurta with mandarin collar - nature''s artistry woven in fabric', 'Block Print', 'Soft cotton with botanical print. Hand wash recommended, dry in shade.', 'Olive Green', 3899, '/placeholder.svg', true),
  ('33333333-3333-3333-3333-333333333333', 'Oversize Off-White', 'Textured beige kurta with collared V-neck - understated sophistication', 'Embroidered', 'Textured cotton weave for enhanced comfort. Machine wash cold, iron on low heat.', 'Off-White', 2999, '/placeholder.svg', true),
  ('44444444-4444-4444-4444-444444444444', 'Light Chinese Blue', 'Striped kurta with mandarin collar - classic patterns, modern comfort', 'Chikankari', 'Cotton blend with vertical stripes. Machine washable, dry flat for best results.', 'Light Blue', 3199, '/placeholder.svg', true);

-- Seed product variants (sizes with stock)
INSERT INTO public.product_variants (product_id, size, stock)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'S', 10),
  ('11111111-1111-1111-1111-111111111111', 'M', 15),
  ('11111111-1111-1111-1111-111111111111', 'L', 12),
  ('11111111-1111-1111-1111-111111111111', 'XL', 8),
  ('22222222-2222-2222-2222-222222222222', 'S', 8),
  ('22222222-2222-2222-2222-222222222222', 'M', 20),
  ('22222222-2222-2222-2222-222222222222', 'L', 15),
  ('22222222-2222-2222-2222-222222222222', 'XL', 10),
  ('33333333-3333-3333-3333-333333333333', 'S', 5),
  ('33333333-3333-3333-3333-333333333333', 'M', 18),
  ('33333333-3333-3333-3333-333333333333', 'L', 14),
  ('33333333-3333-3333-3333-333333333333', 'XL', 6),
  ('44444444-4444-4444-4444-444444444444', 'S', 12),
  ('44444444-4444-4444-4444-444444444444', 'M', 16),
  ('44444444-4444-4444-4444-444444444444', 'L', 10),
  ('44444444-4444-4444-4444-444444444444', 'XL', 7);