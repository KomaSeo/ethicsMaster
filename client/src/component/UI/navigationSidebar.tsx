import * as React from "react";

function SiderBar({content} : {content : React.JSX.Element}) {
  return (
    <div className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] right-[max(0px,calc(50%-45rem))] left-auto w-[19rem] pb-10 pr-8 pl-6 overflow-y-auto">
      {content}
    </div>
  );
}

export default SiderBar;
