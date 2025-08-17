type DisplayBoxColor = 'red' | 'yellow' | 'gray' | 'blue';
interface DisplayBoxColorTypes {
  box: string;
  title: string;
  message: string;
}

function DisplayBox({
  title,
  message,
  color = 'gray',
}: {
  title?: string;
  message: string;
  color?: DisplayBoxColor;
}) {
  const colorMap: Record<DisplayBoxColor, DisplayBoxColorTypes> = {
    red: {
      box: 'border-red-300 bg-red-50',
      title: 'text-red-800',
      message: 'text-red-800',
    },
    yellow: {
      box: 'border-yellow-300 bg-yellow-50',
      title: 'text-yellow-800',
      message: 'text-yellow-800',
    },
    gray: {
      box: 'border-gray-300 bg-gray-50',
      title: 'text-gray-800',
      message: 'text-gray-800',
    },
    blue: {
      box: 'border-blue-300 bg-blue-50',
      title: 'text-blue-800',
      message: 'text-blue-800',
    },
  };
  return (
    <div className={`border p-4 rounded-lg ${colorMap[color].box}`}>
      {title && <h4 className={`font-semibold text-lg ${colorMap[color].title} mb-2`}>{title}</h4>}

      <p className={`text-base ${colorMap[color].message} leading-relaxed`}>{message}</p>
    </div>
  );
}

export default DisplayBox;
