export default function LoginForm() {
  return (
    <div className=" bg-white flex items-start justify-center py-6 sm:py-14">
      <div className="w-full max-w-xl border border-gray-300 rounded-lg p-5 sm:p-10">
        <h1 className="text-2xl font-semibold text-slate-900 mb-6">
          Sign In
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="User ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm text-base outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 hover:bg-blue-700 text-white text-base font-semibold rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}