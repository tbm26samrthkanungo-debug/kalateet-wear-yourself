import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface KurtaCustomisationProps {
  onCustomisationChange: (data: { enabled: boolean; text: string; language: "english" | "hindi" }) => void;
}

const MAX_CHARS = 25;

const KurtaCustomisation = ({ onCustomisationChange }: KurtaCustomisationProps) => {
  const [enabled, setEnabled] = useState(false);
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [text, setText] = useState("");

  const handleToggle = (val: boolean) => {
    setEnabled(val);
    onCustomisationChange({ enabled: val, text, language });
  };

  const handleTextChange = (val: string) => {
    if (val.length <= MAX_CHARS) {
      setText(val);
      onCustomisationChange({ enabled, text: val, language });
    }
  };

  const handleLanguageChange = (lang: "english" | "hindi") => {
    setLanguage(lang);
    onCustomisationChange({ enabled, text, language: lang });
  };

  return (
    <div className="border border-border rounded-lg p-5 bg-secondary/30 mb-6">
      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 font-sanchez">
        Customise Your Kurta
      </h3>

      {/* Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="sleeve-custom" className="text-sm text-foreground cursor-pointer">
          Add Sleeve Customisation <span className="text-accent font-medium">(+₹99)</span>
        </Label>
        <Switch
          id="sleeve-custom"
          checked={enabled}
          onCheckedChange={handleToggle}
        />
      </div>

      {enabled && (
        <div className="space-y-4 animate-fade-in">
          {/* Language Toggle */}
          <div>
            <Label className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
              Language
            </Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLanguageChange("english")}
                className={`px-5 py-2 rounded-sm border text-sm font-medium transition-smooth ${
                  language === "english"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-accent"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange("hindi")}
                className={`px-5 py-2 rounded-sm border text-sm font-medium transition-smooth ${
                  language === "hindi"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-accent"
                }`}
              >
                Hindi
              </button>
            </div>
          </div>

          {/* Text Input */}
          <div>
            <Label htmlFor="embroidery-text" className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
              Enter text for sleeve embroidery
            </Label>
            <Textarea
              id="embroidery-text"
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Your initials, a word, or a short phrase"
              className="bg-background border-border focus:border-primary resize-none min-h-[60px]"
              maxLength={MAX_CHARS}
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {text.length}/{MAX_CHARS} characters
            </p>
          </div>

          {/* Summary */}
          {text.trim() && (
            <div className="border-t border-border pt-3 animate-fade-in">
              <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground mb-1">
                Customisation Selected
              </p>
              <p className="text-sm text-foreground">
                Sleeve Embroidery: <span className="text-accent font-medium">"{text.trim()}"</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KurtaCustomisation;
