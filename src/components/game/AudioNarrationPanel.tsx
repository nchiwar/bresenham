import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Volume2, VolumeX, Key } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AudioNarrationPanelProps {
  apiKey: string | null;
  onApiKeyChange: (key: string) => void;
  isPlaying: boolean;
  onToggleNarration: () => void;
}

export const AudioNarrationPanel = ({
  apiKey,
  onApiKeyChange,
  isPlaying,
  onToggleNarration,
}: AudioNarrationPanelProps) => {
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);
  const [keyInput, setKeyInput] = useState("");

  const handleSaveKey = () => {
    if (keyInput.trim()) {
      onApiKeyChange(keyInput.trim());
      setShowKeyInput(false);
      toast.success("ElevenLabs API key saved!");
    } else {
      toast.error("Please enter a valid API key");
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Audio Narration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!apiKey || showKeyInput ? (
          <div className="space-y-3">
            <Label htmlFor="apiKey" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              ElevenLabs API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <Button onClick={handleSaveKey} className="w-full" size="sm">
              Save API Key
            </Button>
            <p className="text-xs text-muted-foreground">
              Get your free API key at{" "}
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                elevenlabs.io
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`text-sm font-medium ${isPlaying ? "text-success" : "text-muted-foreground"}`}>
                {isPlaying ? "Playing..." : "Ready"}
              </span>
            </div>
            <Button onClick={onToggleNarration} variant="outline" className="w-full gap-2">
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isPlaying ? "Stop Narration" : "Enable Narration"}
            </Button>
            <Button onClick={() => setShowKeyInput(true)} variant="ghost" size="sm" className="w-full text-xs">
              Change API Key
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
