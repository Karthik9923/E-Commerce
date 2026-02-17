import React from 'react'
import { Link } from 'react-router-dom'

const PromoBanner3 = () => {
    return (
        <div>
            <div className=" rounded-lg pt-10 lg:pl-10 lg:pr-10 ">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-6 mb-8 mx-4 sm:mx-0">
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h2 className="text-2xl font-bold text-red-600 mb-2">
                                Build Your Perfect Custom Kit
                            </h2>
                            <p className="text-gray-600 mb-4 max-w-xl">
                                Create your custom bundle with our intuitive Kit Builder.
                                Mix and match components and enjoy exclusive
                                <span className="text-green-600 text-semibold"> bundle discounts!</span>
                            </p>
                            <Link
                                to="/kit"
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
                            >
                                Start Building Now →
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="mx-4 sm:mx-0 mb-8 p-4 bg-white border rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        Why Build a Custom Kit?
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-3">
                            <div className="text-red-500 text-2xl mb-2">⚙️</div>
                            <p className="text-sm font-medium">Personalized Configuration</p>
                        </div>
                        <div className="p-3">
                            <div className="text-red-500 text-2xl mb-2">✔️</div>
                            <p className="text-sm font-medium">Guaranteed Compatibility</p>
                        </div>
                        <div className="p-3">
                            <div className="text-red-500 text-2xl mb-2">💸</div>
                            <p className="text-sm font-medium">Bundle Discounts</p>
                        </div>
                        <div className="p-3">
                            <div className="text-red-500 text-2xl mb-2">🚚</div>
                            <p className="text-sm font-medium">Single Package Shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoBanner3