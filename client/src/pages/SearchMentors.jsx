import { useState } from "react";
import API from "../api/axios";
import MainLayout from "../layouts/MainLayout";

function SearchMentors() {
  const [skill, setSkill] = useState("");
  const [users, setUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchMentors = async () => {
    if (!skill.trim()) {
      alert("Please enter a skill to search");
      return;
    }
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await API.get(`/users/search?skill=${skill}`);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setIsSearching(false);
    }
  };

  const bookSession = async (mentorId) => {
    try {
      const skill = prompt("Which skill do you want to learn?");
      const date = prompt("Enter date (YYYY-MM-DD)");
      const res = await API.post("/sessions/book", {
        mentorId,
        skill,
        date,
      });
      alert(res.data.message || "Session booked successfully");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Find Mentors</h1>
          <p className="text-gray-500 mt-1">Discover skilled mentors to help you grow</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by skill (e.g., React, Python, Design)..."
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchMentors()}
                className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            <button
              onClick={searchMentors}
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {!hasSearched ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Search for mentors by skill</p>
            <p className="text-gray-400 text-sm mt-1">Enter a skill above to find mentors who can help you</p>
          </div>
        ) : isSearching ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Searching for mentors...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No mentors found for "{skill}"</p>
            <p className="text-gray-400 text-sm mt-1">Try a different skill or check back later</p>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Found <span className="font-semibold text-blue-600">{users.length}</span> mentor{users.length !== 1 && "s"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Avatar placeholder + name */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-gray-700 font-medium">{user.rating}</span>
                          <span className="text-gray-400 text-sm">/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-600 mt-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">{user.location || "Location not specified"}</span>
                    </div>

                    {/* Skills Teach */}
                    <div className="mt-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Teaches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {user.skillsTeach?.length > 0 ? (
                          user.skillsTeach.map((skill) => (
                            <span
                              key={skill}
                              className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">No skills listed</span>
                        )}
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => bookSession(user._id)}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition shadow-sm"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default SearchMentors;