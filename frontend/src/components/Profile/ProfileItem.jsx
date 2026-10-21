import React from "react";

const ProfileItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex items-center justify-between py-5 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-5">
      {/* Background Kotak Ikon yang Bikin Mirip Desain */}
      <div className="w-12 h-12 bg-[#E8F5E9] rounded-2xl flex items-center justify-center text-[#2E7D32]">
        {Icon ? (
          <Icon size={24} strokeWidth={1.5} />
        ) : (
          <div className="w-6 h-6 bg-gray-200 rounded-md" />
        )}
      </div>
      <span className="text-[#616161] font-medium text-base">{label}</span>
    </div>
    <div className="text-right">
      <span className="font-bold text-[#212121] text-lg">{value}</span>
      {unit && (
        <span className="ml-1 text-[#757575] text-sm font-medium">{unit}</span>
      )}
    </div>
  </div>
);

export default ProfileItem;
