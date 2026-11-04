"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Arrow, BrandEmblem, TeaCup } from "@/components/illustrations";

function today() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export default function VisitPlanner() {
  const [minDate, setMinDate] = useState("");
  const [visit, setVisit] = useState<{
    name: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);

  function submitVisit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dateInput = event.currentTarget.elements.namedItem(
      "date",
    ) as HTMLInputElement;
    if (String(data.get("date")) < today()) {
      dateInput.setCustomValidity("Choose today or a day ahead.");
      dateInput.reportValidity();
      return;
    }
    setVisit({
      name: String(data.get("name")).trim(),
      date: String(data.get("date")),
      time: String(data.get("time")),
      guests: String(data.get("guests")),
    });
  }

  return (
    <section className="visit-page-content shell" aria-label="Plan your visit">
      <div className="visit-information">
        <div className="visit-information-arch">
          <BrandEmblem />
          <h2>
            There’s always
            <br />
            room for <em>you.</em>
          </h2>
          <p>
            Inspired by North Bengal
            <br />& the tea gardens of Assam
          </p>
          <span className="eyebrow">OPENING DETAILS COMING SOON</span>
        </div>
        <div className="visit-faq">
          <h3>A few little things</h3>
          <details>
            <summary>Where can I find Da Duke?</summary>
            <p>
              This is a sample website for Da Duke and Chai. Our exact address,
              opening date and contact details will be added when they are
              confirmed.
            </p>
          </details>
          <details>
            <summary>Can I reserve a table here?</summary>
            <p>
              The planner is a preview of the experience. It does not make a
              booking or send your details to the café. Reservation details will
              be shared before opening.
            </p>
          </details>
          <details>
            <summary>What’s on the menu?</summary>
            <p>
              Think Assam chai, Darjeeling tea, café favourites and a little
              something sweet.{" "}
              <Link href="/menu">Explore our sample menu.</Link>
            </p>
          </details>
        </div>
      </div>
      <div className="visit-planner" id="planner">
        <TeaCup className="dialog-cup" />
        <p className="eyebrow">MAKE TIME FOR THE LITTLE THINGS</p>
        <h2>
          Your next
          <br />
          <em>slow afternoon.</em>
        </h2>
        {visit ? (
          <div className="visit-success" role="status">
            <p className="success-name">A lovely choice, {visit.name}.</p>
            <p>
              {new Date(`${visit.date}T12:00:00`).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              <br />
              {visit.time} · {visit.guests}{" "}
              {visit.guests === "1" ? "guest" : "guests"}
            </p>
            <p className="dialog-note">
              This is a sample visit plan. No table has been reserved and your
              details have not been sent or saved. We look forward to sharing
              our opening details.
            </p>
            <button
              className="button button-green"
              onClick={() => setVisit(null)}
            >
              Imagine another afternoon <Arrow />
            </button>
          </div>
        ) : (
          <>
            <p className="dialog-intro">Imagine a little time at Da Duke.</p>
            <p className="sample-note">
              Sample planner only — this does not reserve a table.
            </p>
            <form onSubmit={submitVisit} className="visit-form">
              <label>
                Your first name
                <input
                  name="name"
                  required
                  maxLength={50}
                  autoComplete="given-name"
                  placeholder="What shall we call you?"
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Your day
                <input
                  name="date"
                  type="date"
                  required
                  min={minDate}
                  onFocus={() => setMinDate(today())}
                  onChange={(e) => e.currentTarget.setCustomValidity("")}
                />
              </label>
              <div className="form-row">
                <label>
                  Your moment
                  <select name="time" defaultValue="4:00 pm">
                    <option>10:00 am</option>
                    <option>12:00 pm</option>
                    <option>2:00 pm</option>
                    <option>4:00 pm</option>
                    <option>6:00 pm</option>
                  </select>
                </label>
                <label>
                  Your company
                  <select name="guests" defaultValue="2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n === 1 ? "Just me" : `${n} guests`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button className="button button-green" type="submit">
                Preview my afternoon <Arrow />
              </button>
              <p className="form-privacy">
                Just a daydream for now. Nothing is sent or stored.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
