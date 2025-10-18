import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseAudioNarrationProps {
  apiKey?: string;
  voiceId?: string;
  modelId?: string;
}

export const useAudioNarration = ({
  apiKey,
  voiceId = "9BWtsMINqrJLrRacOk9x", // Aria voice by default
  modelId = "eleven_turbo_v2_5",
}: UseAudioNarrationProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(
    async (text: string) => {
      if (!apiKey) {
        console.warn("ElevenLabs API key not provided. Skipping narration.");
        return;
      }

      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      try {
        setIsPlaying(true);

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text,
            model_id: modelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate speech");
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setIsPlaying(false);
          toast.error("Error playing audio");
        };

        setCurrentAudio(audio);
        await audio.play();
      } catch (error) {
        console.error("Audio narration error:", error);
        setIsPlaying(false);
        toast.error("Failed to play narration");
      }
    },
    [apiKey, voiceId, modelId, currentAudio]
  );

  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentAudio]);

  return { speak, stop, isPlaying };
};
