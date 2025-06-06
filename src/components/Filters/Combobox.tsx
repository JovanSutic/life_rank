import React, { useState, useRef, useEffect } from 'react';

interface ComboBoxProps {
  options: string[];
  label: string;
  onChange: (value: string, position: string) => void;
  name: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, label, onChange, name }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    onChange(option, name);
  };

  const handleClear = () => {
    setInputValue('');
    onChange('', name);
    setIsOpen(true);
    setHighlightedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear selection"
          >
            ×
          </button>
        )}

        {isOpen && (
          <ul className="absolute z-1001 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-300 shadow-lg text-sm">
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-gray-500">No results found</li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`cursor-pointer px-3 py-2 ${
                    highlightedIndex === index ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
                  }`}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
