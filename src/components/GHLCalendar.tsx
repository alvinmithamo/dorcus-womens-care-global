import { useEffect } from "react";

const GHLCalendar = ({ src }) => {
  useEffect(() => {
    // Load the GHL embed script (auto-resizes iframe)
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendar-wrapper w-full">
      <iframe
        src={src}
        style={{ width: "100%", border: "none", overflow: "hidden" }}
        scrolling="no"
        title="GHL Calendar"
      ></iframe>
    </div>
  );
};

export default GHLCalendar;
