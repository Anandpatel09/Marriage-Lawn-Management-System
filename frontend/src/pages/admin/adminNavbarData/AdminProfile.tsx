import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // User should exist because AdminProfile is protected by AdminRoute
  if (!user) {
    return null;
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  const initials =
    `${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 bg-[#17120f]/95 backdrop-blur border-b border-[#332a25]">
        <div className="px-2 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif">My Profile</h1>

            <p className="mt-1 text-sm text-[#a89b92]">
              Manage your admin account information
           </p>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="
                            hidden
                            sm:flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-lg
                            border
                            border-[#493d35]
                            text-[#d6ccc5]
                            hover:bg-[#2a211c]
                            hover:text-white
                            transition
                        "
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* ================= PROFILE CARD ================= */}
          <div className="bg-[#241d18] border border-[#493d35] rounded-2xl overflow-hidden">
            {/* Cover */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-[#39281b] via-[#4a351f] to-[#2c2119]" />

            {/* Profile Header */}
            <div className="px-5 sm:px-8 pb-7">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14">
                {/* Avatar */}
                <div
                  className="
                                        w-24
                                        h-24
                                        sm:w-28
                                        sm:h-28
                                        rounded-full
                                        bg-[#a94b3f]
                                        border-4
                                        border-[#241d18]
                                        flex
                                        items-center
                                        justify-center
                                        text-white
                                        text-3xl
                                        sm:text-4xl
                                        font-serif
                                        shrink-0
                                    "
                >
                  {initials}
                </div>

                {/* Name */}
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-serif">
                      {fullName}
                    </h2>

                    <span
                      className=" inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3b2d1b] text-[#d8a849] text-xs font-medium
                                            "
                    >
                      <ShieldCheck size={13} />
                      Admin
                    </span>
                  </div>

                  <p className="text-sm text-[#a89b92] mt-1">{user.email}</p>
                </div>

                {/* Edit button */}
                <button
                  className=" flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#d8a849] text-black text-sm font-medium hover:bg-[#c99a3d] transition
                                    "
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* ================= INFORMATION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            {/* Personal Information */}
            <div className="lg:col-span-2 bg-[#241d18] border border-[#493d35] rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#3b2d1b] text-[#d8a849] flex items-center justify-center">
                  <UserRound size={19} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>

                  <p className="text-sm text-[#a89b92]">Your account details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    First Name
                  </p>

                  <div className="px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <p className="text-white">{user.first_name}</p>
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    Last Name
                  </p>

                  <div className="px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <p className="text-white">{user.last_name}</p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    Email Address
                  </p>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <Mail size={17} className="text-[#d8a849] shrink-0" />

                    <p className="text-white text-sm truncate">{user.email}</p>
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    Mobile Number
                  </p>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <Phone size={17} className="text-[#d8a849] shrink-0" />

                    <p className="text-white text-sm">
                      {user.mobile || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* City */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    City
                  </p>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <MapPin size={17} className="text-[#d8a849] shrink-0" />

                    <p className="text-white text-sm">
                      {user.city || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    Account Role
                  </p>

                  <div className="px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <span className="inline-flex items-center gap-2 text-[#d8a849] text-sm font-medium capitalize">
                      <ShieldCheck size={16} />
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Summary */}
            <div className="bg-[#241d18] border border-[#493d35] rounded-2xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Account Summary</h3>

              <p className="text-sm text-[#a89b92] mt-1">
                Administrator access
              </p>

              {/* Account type */}
              <div className="mt-6 p-4 rounded-xl bg-[#1d1713] border border-[#3d332d]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849]">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <p className="text-xs text-[#8f827a]">Account Type</p>

                    <p className="text-white font-medium mt-1">Administrator</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3 p-4 rounded-xl bg-[#1d1713] border border-[#3d332d]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849]">
                    <Mail size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-[#8f827a]">Email</p>

                    <p className="text-white text-sm mt-1 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mt-3 p-4 rounded-xl bg-[#1d1713] border border-[#3d332d]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849]">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-[#8f827a]">Location</p>

                    <p className="text-white text-sm mt-1">
                      {user.city || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
