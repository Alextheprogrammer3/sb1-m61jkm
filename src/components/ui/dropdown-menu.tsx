import { Component, JSX, Show, createSignal, onCleanup } from "solid-js";

interface DropdownMenuProps {
  trigger: JSX.Element;
  children: JSX.Element;
  align?: "left" | "right";
}

const DropdownMenu: Component<DropdownMenuProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest("[data-dropdown]")) {
      setIsOpen(false);
    }
  };

  // Add and remove event listener
  if (typeof window !== "undefined") {
    document.addEventListener("click", handleClickOutside);
    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
    });
  }

  return (
    <div class="relative" data-dropdown>
      <div onClick={() => setIsOpen(!isOpen())}>
        {props.trigger}
      </div>
      <Show when={isOpen()}>
        <div
          class={`absolute z-50 mt-2 ${
            props.align === "right" ? "right-0" : "left-0"
          } min-w-[240px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
};

export default DropdownMenu;