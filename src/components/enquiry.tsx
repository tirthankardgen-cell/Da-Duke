"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/components/demo-content";
import { Arrow } from "@/components/illustrations";
import { cafeToday, occasionMessage, whatsappUrl } from "@/lib/site-utils";
import { trackDemo } from "@/lib/demo-analytics";

export function WhatsAppLink({
  message,
  children = "Enquire on WhatsApp",
  className = "button button-green",
}: {
  message?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { settings } = useContent();
  const path = usePathname();
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const text = message || settings.enquiryMessage;
  const url = whatsappUrl(settings.whatsapp, text);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  if (url)
    return (
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDemo("whatsapp", path)}
      >
        {children}
        <Arrow />
      </a>
    );
  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => {
          setCopied(false);
          setCopyError(false);
          dialog.current?.showModal();
        }}
      >
        {children}
        <Arrow />
      </button>
      <dialog
        className="enquiry-dialog"
        ref={dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close enquiry preview"
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <p className="eyebrow">A CONVERSATION, SOON</p>
        <h2 id={titleId}>
          A little hello,
          <br />
          <em>ready to send.</em>
        </h2>
        <p>
          Our WhatsApp contact is still to be announced. Keep a copy of your
          message for when the details are ready.
        </p>
        <label className="preview-label">
          Your message
          <textarea readOnly value={text} rows={5} />
        </label>
        <button
          className="button button-green"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
            } catch {
              setCopyError(true);
            }
          }}
        >
          {copied ? "Message copied" : "Copy message"}
          <Arrow />
        </button>
        <p className="form-note" role="status">
          {copyError
            ? "Select the message above to copy it. Clipboard access is unavailable."
            : copied
              ? "Copied to your clipboard. Nothing has been sent to the café."
              : "Nothing has been sent or reserved."}
        </p>
      </dialog>
    </>
  );
}

export default function EnquiryComposer() {
  const { settings } = useContent();
  const [occasion, setOccasion] = useState(
    settings.occasions[0] || "Private gathering",
  );
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [notes, setNotes] = useState("");
  const [preview, setPreview] = useState(false);
  const [minDate, setMinDate] = useState("");
  const message = occasionMessage(occasion, date, guests, notes);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (date && date < cafeToday()) {
      const input = event.currentTarget.elements.namedItem(
        "date",
      ) as HTMLInputElement;
      input.setCustomValidity("Choose today or a date in the future.");
      input.reportValidity();
      return;
    }
    setPreview(true);
  }

  return (
    <div className="enquiry-composer" id="enquire">
      <p className="eyebrow">TELL US WHAT YOU HAVE IN MIND</p>
      <h2>
        Begin with
        <br />
        <em>a little hello.</em>
      </h2>
      <p className="composer-intro">
        A few details help us make it personal. All fields are optional.
      </p>
      <form
        className="enquiry-form"
        onSubmit={prepare}
        onChange={() => setPreview(false)}
      >
        <label>
          The occasion
          <select
            value={occasion}
            onChange={(event) => setOccasion(event.target.value)}
          >
            {settings.occasions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label>
            Preferred date
            <input
              name="date"
              type="date"
              value={date}
              min={minDate}
              onFocus={() => setMinDate(cafeToday())}
              onChange={(event) => {
                event.currentTarget.setCustomValidity("");
                setDate(event.target.value);
              }}
            />
          </label>
          <label>
            Approximate guests
            <input
              type="number"
              min="1"
              max="999"
              step="1"
              placeholder="e.g. 12"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
            />
          </label>
        </div>
        <label>
          Anything else?
          <textarea
            rows={3}
            maxLength={1000}
            placeholder="A little about the evening you’re imagining…"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </label>
        <button className="button button-green" type="submit">
          Prepare my enquiry
          <Arrow />
        </button>
      </form>
      {preview && (
        <div className="message-preview" aria-live="polite">
          <p className="eyebrow">YOUR WHATSAPP MESSAGE</p>
          <p>{message}</p>
          <WhatsAppLink message={message} />
          <p className="form-note">
            Send the message yourself in WhatsApp to start the conversation.
          </p>
        </div>
      )}
      <p className="form-note">
        Enquiries are subject to confirmation by our team. These details are
        used only to compose your message and are not saved by this website.
      </p>
    </div>
  );
}
