import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { Task } from "@/types/task";

type TimerContextType = {
    activeTask: Task | null;
    seconds: number;
    isRunning: boolean;
    startTask: (task: Task) => void;
    pauseTask: () => void;
    stopTask: () => void;
    formatTime: (totalSeconds: number) => string;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
    const [activeTask, setActiveTask] = useState<Task | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && activeTask) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, activeTask]);

    const startTask = (task: Task) => {
        if (activeTask?._id !== task._id) {
            // Switching tasks, reset timer
            setSeconds(0);
        }
        setActiveTask(task);
        setIsRunning(true);
    };

    const pauseTask = () => {
        setIsRunning(false);
    };

    const stopTask = () => {
        setIsRunning(false);
        setActiveTask(null);
        setSeconds(0);
        // Here you would typically save the time to the backend
        // console.log("Saved time:", seconds, "for task", activeTask?._id);
    };

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <TimerContext.Provider
            value={{
                activeTask,
                seconds,
                isRunning,
                startTask,
                pauseTask,
                stopTask,
                formatTime,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }
    return context;
};
