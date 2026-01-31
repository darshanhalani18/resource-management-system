"use client";

import React, { useState } from "react";

export default function LocationTree() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Tree Search/Filter */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            filter_list
          </span>
          <input 
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-4 focus:ring-blue-50 focus:border-[#137fec] transition-all outline-none" 
            placeholder="Filter locations..." 
            type="text"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {/* We wrap rows in a parent component or manage them as a nested list */}
        <TreeItem label="Global Headquarters" type="Site" level={0}>
          <TreeItem label="Floor 1" level={1}>
            <TreeItem label="Storage Room A" level={2} icon="meeting_room" isLeaf />
            <TreeItem label="IT Lab & Development" level={2} icon="biotech" isLeaf />
          </TreeItem>
          <TreeItem label="Floor 2" level={1} />
        </TreeItem>
        
        <TreeItem label="London Regional Office" type="Site" level={0} />
        <TreeItem label="West Coast Logistics Hub" type="Warehouse" level={0} lastRow />
      </div>
    </div>
  );
}

function TreeItem({ label, type, level, children, icon, isLeaf, lastRow }: any) {
  const [isOpen, setIsOpen] = useState(true); // Control collapse/expand
  const paddingLeft = level === 0 ? "px-6" : level === 1 ? "pl-14 pr-6" : "pl-24 pr-6";

  return (
    <>
      <div className={`group flex items-center justify-between py-4 hover:bg-gray-50 transition-colors ${!lastRow && 'border-b border-gray-50'} ${paddingLeft}`}>
        <div className="flex items-center gap-3">
          {/* Toggle Button */}
          {!isLeaf && children ? (
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center transition-transform duration-200"
            >
              <span className={`material-symbols-outlined text-[#137fec] ${!isOpen && '-rotate-90'}`}>
                expand_more
              </span>
            </button>
          ) : (
            <span className="w-6 h-6"></span> 
          )}
          
          <span className="material-symbols-outlined text-slate-400">
            {icon || (type === 'Site' ? 'domain' : type === 'Warehouse' ? 'warehouse' : 'layers')}
          </span>
          
          <span className={`text-slate-700 ${level === 0 ? 'font-bold' : 'font-medium'}`}>
            {label}
          </span>

          {type && (
            <span className="text-[10px] bg-blue-50 text-[#137fec] border border-blue-100 px-2 py-0.5 rounded-full uppercase font-black tracking-widest">
              {type}
            </span>
          )}
        </div>

        {/* Actions visible on hover */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-opacity">
          <button className="p-1.5 hover:bg-white border border-transparent hover:border-gray-100 rounded text-slate-400 hover:text-[#137fec] shadow-sm">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button className="p-1.5 hover:bg-white border border-transparent hover:border-gray-100 rounded text-slate-400 hover:text-red-500 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>

      {/* Render children only if open */}
      {isOpen && children && (
        <div className="flex flex-col">
          {children}
        </div>
      )}
    </>
  );
}