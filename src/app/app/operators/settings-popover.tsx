"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { Trash } from "lucide-react";
import { deleteAgent } from "@/server-functions/agents";

const SettingsPopover = ({ id }: { id: string }) => {

    
    const handleDelete = async (id: string) => {
        
        const response = await deleteAgent(id);
       
        return response;
    };

    return (
        <Popover>
            <PopoverTrigger>
                <button className="p-2 rounded-full text-gray-600 hover:text-white">
                    <Settings size={20} />
                </button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
                <div className="flex gap-4 items-center justify-between">
                    <p className="text-sm text-red-700">Delete Operator</p>
                    <Button onClick={() => handleDelete(id)}><Trash /></Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SettingsPopover;
