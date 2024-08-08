import React from "react";

function SiderBar({stage, content}) {
  const statusDisplayList = []
  return (
    <div class="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 pr-6 overflow-y-auto">
      {content}
    </div>
  );
}

export default SiderBar;
