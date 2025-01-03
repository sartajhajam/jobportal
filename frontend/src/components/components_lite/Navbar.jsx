import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">
                        <span className="text-[#6B3AC2]"> Job </span>{" "}
                        <span className="text-[#FA4F09]">Portal</span>
                    </h1>
                </div>
                <div className="flex items-center gap-10">
                    <ul className="flex font-medium items-center gap-6">
                        <li>
                            {" "}
                            <Link to={"/Home"}>Home</Link>
                        </li>
                        <li>
                            {" "}
                            <Link to={"/Browse"}>Browse</Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to={"/Jobs"}>Jobs</Link>
                        </li>
                    </ul>
                    {!user ? (
                        <div className=" flex items-center gap-2">
                            <Link to={"/login"}>
                                {" "}
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to={"/register"}>
                                {" "}
                                <Button className="bg-red-600  hover:bg-red-700">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="flex items-center gap-4 space-y-2">
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">Ankit Pathak</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600  ">
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <User2></User2>
                                        <Button variant="link"> <Link to={"/Profile"}> Profile</Link> </Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut></LogOut>
                                        <Button variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;