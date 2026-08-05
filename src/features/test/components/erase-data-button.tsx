"use client";

import { useState } from "react";
import { eraseTestData } from "../lib/storage";

export function EraseDataButton() {
  const [erased, setErased] = useState(false);

  return (
    <div className="erase-row">
      <button
        className="button button-danger"
        type="button"
        onClick={() => {
          if (!window.confirm("همه پاسخ‌ها و نتیجه ذخیره‌شده از این مرورگر پاک شوند؟")) return;
          eraseTestData();
          setErased(true);
        }}
      >
        پاک‌کردن داده آزمون
      </button>
      {erased ? <span role="status">داده آزمون از این مرورگر پاک شد.</span> : null}
    </div>
  );
}
