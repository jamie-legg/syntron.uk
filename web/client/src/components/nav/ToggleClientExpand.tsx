import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ToggleClientExpand() {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpandToggle = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <Button
            onClick={handleExpandToggle}
            className="flex items-center gap-2 text-sky-200"
        >
            {isExpanded ? (
                <>
                    <ArrowsPointingInIcon className="h-5 w-5 -mb-1 text-sky-300" />
                </>
            ) : (
                <>
                    <ArrowsPointingOutIcon className="h-5 w-5 -mb-1 text-sky-300" />
                </>
            )}
        </Button>
    )
}