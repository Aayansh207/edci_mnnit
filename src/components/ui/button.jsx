const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-white text-black hover:bg-zinc-200 shadow",
  outline: "border border-zinc-800 bg-transparent hover:bg-zinc-800 text-white",
  ghost: "hover:bg-zinc-800 text-zinc-400 hover:text-white",
};

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-md px-8",
};

const Button = ({ children, className, variant = "default", size = "default", ...props }) => {
  const selectedVariant = variants[variant] || variants.default;
  const selectedSize = sizes[size] || sizes.default;

  return (
    <button
      className={`${baseStyles} ${selectedVariant} ${selectedSize} ${className || ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;