import React from 'react'


const LandingPage = () => {
  return (
<div className="App bg-white text-black"> {/* Main background color */}
      {/* Hero Section */}
      <header className="bg-black text-center py-20">
        <h1 className="text-4xl text-white font-extrabold">The Most Absurd Reasons You have Ever Cried</h1>
        <p className="text-xl text-white mt-4">
          Join the community and share your funniest, most absurd crying stories.
        </p>
        <a
          href="/register"
          className="mt-6 inline-block bg-purple-200 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-300 transition duration-300"
        >
          Get Started
        </a>
      </header>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Register & Log In</h3>
            <p>Create an account and start sharing your absurd stories!</p>
          </div>
          <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Vote & Rank</h3>
            <p>Vote for the funniest and most absurd stories submitted by others.</p>
          </div>
          <div className="text-center bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Personalized Feed</h3>
            <p>Your feed will adapt to show the stories that match your taste!</p>
          </div>
        </div>
      </section>

      {/* Popular Reasons Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Top Reasons to Cry</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl">
              I cried because I dropped my ice cream on the ground!
            </p>
            <button className="mt-4 bg-purple-200 text-black px-4 py-2 rounded-full hover:bg-purple-300 transition duration-300">
              Vote Up
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl">
              I cried when my dog stole my fries!
            </p>
            <button className="mt-4 bg-purple-200 text-black px-4 py-2 rounded-full hover:bg-purple-300 transition duration-300">
              Vote Up
            </button>
          </div>
          <a
            href="/explore"
            className="text-center block mt-6 text-lg text-purple-500 hover:text-purple-600 transition duration-300"
          >
            View More
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="text-center">
          <a href="/register" className="mx-4">Register</a>
          <a href="/login" className="mx-4">Login</a>
          <a href="/privacy-policy" className="mx-4">Privacy Policy</a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="mx-4">Facebook</a>
          <a href="#" className="mx-4">Instagram</a>
          <a href="#" className="mx-4">Twitter</a>
        </div>
      </footer>
    </div>
  
)
}

export default LandingPage
