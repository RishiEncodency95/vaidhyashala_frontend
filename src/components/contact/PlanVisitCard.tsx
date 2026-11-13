"use client";

import React from "react";
import { assetUrl } from "@/lib/home2";
import "./PlanVisitCard.css";

export interface PlanVisitContent {
  eyebrow: string;
  heading: string;
  description: string;
  note: string;
  /** Decorative leaf picture, bottom right (white background) */
  image: string;
  items: { iconImage: string; title: string; description: string }[];
}

/** Map pin: outline with a filled dot (design icon, drawn in the 183 × 183 circle) */
function PinIcon() {
  return (
    <svg viewBox="0 0 183 183" aria-hidden="true" fill="none">
      <path
        d="M91.5 140 L64.7 93.5 A31 31 0 1 1 118.3 93.5 Z"
        stroke="#0e3b2d"
        strokeWidth="4.6"
        strokeLinejoin="round"
      />
      <circle cx="91.5" cy="79" r="10" fill="#0e3b2d" />
    </svg>
  );
}

/** Clock: ring with two hands */
function ClockIcon() {
  return (
    <svg viewBox="0 0 183 183" aria-hidden="true" fill="none">
      <circle cx="91.5" cy="91.5" r="39" stroke="#0e3b2d" strokeWidth="4.6" />
      <path d="M89 69 V91 L107 104" stroke="#0e3b2d" strokeWidth="4.6" strokeLinejoin="miter" />
    </svg>
  );
}

const DEFAULT_ICONS = [PinIcon, ClockIcon];

export default function PlanVisitCard({ content }: { content: PlanVisitContent }) {
  const { eyebrow, heading, description, note, image, items } = content;

  return (
    <div className="pvc-wrap">
      <section className="pvc-card" aria-label={heading}>
        <p className="pvc-eyebrow">{eyebrow}</p>
        <h2 className="pvc-serif pvc-heading">{heading}</h2>
        <p className="pvc-sans pvc-subtitle">{description}</p>

        <ol className="pvc-list">
          {items.map((item, index) => {
            const Icon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
            const last = index === items.length - 1;
            return (
              <li key={`${item.title}-${index}`} className="pvc-item">
                <div className="pvc-icon-col">
                  <div className="pvc-circle">
                    {item.iconImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={assetUrl(item.iconImage)} alt="" />
                    ) : (
                      <Icon />
                    )}
                  </div>
                  {/* Dotted connector to the next step (or to the note) */}
                  <div className="pvc-connector" aria-hidden="true">
                    <span className="pvc-dash" style={{ height: `calc(var(--u) * ${last ? 17 : 33})` }} />
                    <span className="pvc-dot" style={{ marginTop: `calc(var(--u) * ${last ? 8 : 2})` }} />
                  </div>
                </div>
                <div className="pvc-text">
                  <h3 className="pvc-serif pvc-title">{item.title}</h3>
                  <p className="pvc-sans pvc-desc">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {note && (
          <div className="pvc-note">
            <span className="pvc-note-icon" aria-hidden="true">
              i
            </span>
            <p className="pvc-sans pvc-note-text">{note}</p>
          </div>
        )}

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="pvc-leaf" src={assetUrl(image)} alt="" aria-hidden="true" />
        )}
      </section>
    </div>
  );
}
