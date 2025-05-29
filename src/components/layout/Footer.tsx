import UPVLogo from "../../assets/upv.svg";
import ETSINFLogo from "../../assets/etsinf.svg";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Delivetter
                        </h3>
                        <p className="text-gray-300">
                            The Future of Urban Delivery
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Sites</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/about"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/comparison"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Comparison
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/simulation"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Simulation
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <a
                            href="mailto:info@delivetter.tech"
                            className="text-gray-300 hover:text-white transition"
                        >
                            info@delivetter.tech
                        </a>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 flex flex-col gap-10 lg:flex-row lg:gap-40 items-center justify-center">
                    <img src={UPVLogo} alt="UPV Logo" className="h-16" />
                    <img src={ETSINFLogo} alt="ETSINF Logo" className="h-16" />
                </div>
            </div>
        </footer>
    );
}
