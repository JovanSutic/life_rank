import Wrapper from './Wrapper';

export default function MainContent() {
  const { toggleLeft, toggleRight } = Wrapper.useWrapper();

  return (
    <div className="p-4 space-x-2">
      <h1>Main Content</h1>
      <button onClick={toggleLeft} className="bg-blue-500 text-white px-2 py-1 rounded">
        Toggle Left
      </button>
      <button onClick={toggleRight} className="bg-green-500 text-white px-2 py-1 rounded">
        Toggle Right
      </button>
    </div>
  );
}
