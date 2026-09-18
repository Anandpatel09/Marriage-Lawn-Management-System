import {
  Mail,
  MapPin,
  Phone,
  UserRound,
  ShieldCheck,
  CalendarCheck,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#17120f] flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  const initials =
    `${user.first_name?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#17120f] text-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 bg-[#17120f]/95 backdrop-blur border-b border-[#332a25]">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif">My Profile</h1>

              <p className="text-sm text-[#a89b92] mt-1">
                Manage your account information
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
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
                                text-[#d0c6bf]
                                hover:bg-[#2a211c]
                                hover:text-white
                                transition
                            "
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* ================= PROFILE HEADER ================= */}

          <div className="bg-[#241d18] border border-[#493d35] rounded-2xl overflow-hidden">
            {/* Cover */}
            <div className="h-28 sm:h-40 bg-gradient-to-r from-[#39281b] via-[#4a351f] to-[#2c2119]" />

            {/* Profile details */}
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
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-serif break-words">
                      {fullName}
                    </h2>

                    <span
                      className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                px-2.5
                                                py-1
                                                rounded-full
                                                bg-[#3b2d1b]
                                                text-[#d8a849]
                                                text-xs
                                                font-medium
                                            "
                    >
                      <ShieldCheck size={13} />
                      Customer
                    </span>
                  </div>

                  <p className="text-sm text-[#a89b92] mt-1 truncate">
                    {user.email}
                  </p>
                </div>

                {/* Edit */}
                <button
                  onClick={() => navigate("/profile/edit")}
                  className="
                                        w-full
                                        sm:w-auto
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-4
                                        py-2.5
                                        rounded-lg
                                        bg-[#d8a849]
                                        text-black
                                        text-sm
                                        font-medium
                                        hover:bg-[#c99a3d]
                                        transition
                                    "
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            {/* ================= PERSONAL INFORMATION ================= */}

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

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d] min-w-0">
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

                {/* Account Role */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#8f827a] mb-2">
                    Account Type
                  </p>

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1d1713] border border-[#3d332d]">
                    <ShieldCheck size={17} className="text-[#d8a849]" />

                    <p className="text-white text-sm capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= QUICK ACCESS ================= */}

            <div className="bg-[#241d18] border border-[#493d35] rounded-2xl p-5 sm:p-6">
              <h3 className="text-lg font-semibold">Quick Access</h3>

              <p className="text-sm text-[#a89b92] mt-1">
                Manage your marriage lawn activities
              </p>

              {/* My Bookings */}
              <button
                onClick={() => navigate("/bookings")}
                className="
                                    w-full
                                    mt-6
                                    flex
                                    items-center
                                    gap-3
                                    p-4
                                    rounded-xl
                                    bg-[#1d1713]
                                    border
                                    border-[#3d332d]
                                    hover:bg-[#2a211c]
                                    transition
                                    text-left
                                "
              >
                <div className="w-11 h-11 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849] shrink-0">
                  <CalendarCheck size={20} />
                </div>

                <div>
                  <p className="text-white font-medium">My Bookings</p>

                  <p className="text-xs text-[#8f827a] mt-1">
                    View your bookings
                  </p>
                </div>
              </button>

              {/* Book Now */}
              <button
                onClick={() => navigate("/booknow")}
                className="
                                    w-full
                                    mt-3
                                    flex
                                    items-center
                                    gap-3
                                    p-4
                                    rounded-xl
                                    bg-[#1d1713]
                                    border
                                    border-[#3d332d]
                                    hover:bg-[#2a211c]
                                    transition
                                    text-left
                                "
              >
                <div className="w-11 h-11 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849] shrink-0">
                  <CalendarCheck size={20} />
                </div>

                <div>
                  <p className="text-white font-medium">Book a Lawn</p>

                  <p className="text-xs text-[#8f827a] mt-1">
                    Create a new booking
                  </p>
                </div>
              </button>

              {/* Profile status */}
              <div className="mt-5 p-4 rounded-xl bg-[#1d1713] border border-[#3d332d]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3b2d1b] flex items-center justify-center text-[#d8a849]">
                    <ShieldCheck size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-[#8f827a]">Account Status</p>

                    <p className="text-[#55b36b] text-sm font-medium mt-1">
                      Active
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

export default UserProfile;
