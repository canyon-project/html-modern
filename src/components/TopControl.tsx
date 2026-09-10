import { List, ListTree, Moon, Sun } from "lucide-react";
import type { FC } from "react";

import { useTheme } from "../theme-context";

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
              <ListTree size={14} aria-hidden />
              Code Tree
            </button>
            <button
              type="button"
              className={showMode === "list" ? "view-toggle__btn is-active" : "view-toggle__btn"}
              onClick={() => onChangeShowMode("list")}
            >
              <List size={14} aria-hidden />
              File List
            </button>
          </div>
          <span className="top-control__count">{total} Total Files</span>
        </div>

        <div className="top-control__right">
          <button
            type="button"
            className="icon-btn"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
          </button>
          <input
            className="search-input"
            type="search"
            placeholder="Search for files"
            value={filenameKeywords}
            onChange={(event) => onChangeKeywords(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TopControl;
