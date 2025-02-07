import { newtonsCradle } from "ldrs";

newtonsCradle.register();

const Loader = ({ show }: { show: boolean }) => {
  if (!show) return null; // Don't render if show is false

  return (
    <div className="flex justify-center items-center h-full">
      <l-newtons-cradle size="78" speed="1.4" color="black"></l-newtons-cradle>
    </div>
  );
};

export default Loader;
