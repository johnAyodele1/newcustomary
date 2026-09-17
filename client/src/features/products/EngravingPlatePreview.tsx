import { useEffect, useState } from 'react';

type Props = { text: string };

export function EngravingPlatePreview({ text }: Props) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const timer = window.setTimeout(() => setDisplayText(text), 120);
    return () => window.clearTimeout(timer);
  }, [text]);

  return (
    <div className="engraving-preview" aria-label="Live engraving preview">
      <div className="engraving-plate"><span>{displayText || 'Your engraving'}</span></div>
      <p>Live preview · actual engraving follows your final selection.</p>
    </div>
  );
}
