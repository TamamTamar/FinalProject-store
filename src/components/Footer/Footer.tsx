import { Tooltip } from "flowbite-react";
import { FiHome, FiInfo, FiMail } from "react-icons/fi"; // Import additional icons

export const FooterComponent = () => {

    return (
        <footer className="bg-[#faebd7] rounded-lg shadow-sm m-4 dark:bg-[#2d3748]">
            <div className="flex items-center justify-between p-4">
                <span className="text-sm text-[#806b7c] dark:text-[#9ca3af]">
                    2024 - Tamar Tamam ©
                </span>
                <div className="flex-1 flex justify-center">
                    <ul className="flex items-center text-sm font-medium text-[#5d6370] dark:text-gray-400 mt-0 p-0 list-none">
                        <li className="mx-2">
                            <Tooltip content="Home" placement="top" className="text-xs bg-gray-700 text-white rounded px-2 py-1">
                                <a href="/" className="hover:underline"><FiHome /></a>
                            </Tooltip>
                        </li>
                        <li className="mx-2">
                            <Tooltip content="About" placement="top" className="text-xs bg-gray-700 text-white rounded px-2 py-1">
                                <a href="/about" className="hover:underline"><FiInfo /></a>
                            </Tooltip>
                        </li>
                        <li className="mx-2">
                            <Tooltip content="Contact" placement="top" className="text-xs bg-gray-700 text-white rounded px-2 py-1">
                                <a href="/contact" className="hover:underline"><FiMail /></a>
                            </Tooltip>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default FooterComponent;
