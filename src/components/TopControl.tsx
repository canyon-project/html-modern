import type { FC } from "react";

import TreeViewIcon from "../icons/TreeViewIcon";
import { useTheme } from "../theme-context";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TopControl: FC<{
  total: number;
  showMode: string;
  filenameKeywords: string;
  onChangeShowMode: (mode: string) => void;
  onChangeKeywords: (word: string) => void;
}> = ({ total, showMode, onChangeShowMode, onChangeKeywords, filenameKeywords }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="top-control">
      <div className="top-control__row">
        <div className="top-control__left">
          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              className={showMode === "tree" ? "view-toggle__btn is-active" : "view-toggle__btn"}
              onClick={() => onChangeShowMode("tree")}
            >
              <TreeViewIcon width={14} height={14} />
              Tree
            </button>
            <button
              type="button"
              className={showMode === "list" ? "view-toggle__btn is-active" : "view-toggle__btn"}
              onClick={() => onChangeShowMode("list")}
            >
              <ListIcon />
              List
            </button>
          </div>
          <span className="top-control__count">{total} files</span>
        </div>

        <div className="top-control__right">
          <button
            type="button"
            className="icon-btn"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <input
            className="search-input"
            type="search"
            placeholder="Search files"
            value={filenameKeywords}
            onChange={(event) => onChangeKeywords(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TopControl;
