import { useState, useEffect } from "react";
import useSwr from "swr";

export const Loading = () => (
  <>
    <div className="items-center fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-green-500 opacity-75 flex flex-col justify-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">.</span>
      </div>
    </div>
  </>
);
