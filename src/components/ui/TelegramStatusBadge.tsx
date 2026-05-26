import React from 'react';
import { Check, Loader2, Unlink, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TelegramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.874 13.92l-2.97-.924c-.646-.203-.658-.646.136-.958l11.57-4.461c.537-.194 1.006.131.284.644z" />
    </svg>
);

interface TelegramStatusBadgeProps {
    linked: boolean;
    username?: string | null;
    linkedAt?: string | null;
    notificationsEnabled?: boolean;
    onUnlink?: () => void;
    isUnlinking?: boolean;
    compact?: boolean;
}

/**
 * Reusable Telegram connection status badge.
 * Shows a green "Linked" card when connected, or a blue "Connect" prompt when not.
 */
export const TelegramStatusBadge: React.FC<TelegramStatusBadgeProps> = ({
    linked,
    username,
    linkedAt,
    notificationsEnabled = true,
    onUnlink,
    isUnlinking = false,
    compact = false,
}) => {
    if (linked) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
                <div className="p-1.5 bg-green-100 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-green-800 text-sm flex items-center gap-1.5">
                        <TelegramIcon className="w-3.5 h-3.5 text-[#2AABEE]" />
                        Telegram Connected
                    </div>
                    {!compact && (
                        <div className="text-xs text-green-600 mt-0.5">
                            @{username || 'Telegram User'}
                            {linkedAt && ` · Linked ${new Date(linkedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                        </div>
                    )}
                    <div className={`text-xs mt-0.5 ${notificationsEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                        Notifications {notificationsEnabled ? '● On' : '○ Off'}
                    </div>
                </div>
                {onUnlink && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 gap-1"
                        onClick={onUnlink}
                        disabled={isUnlinking}
                    >
                        {isUnlinking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Unlink className="w-3.5 h-3.5" />}
                        {!compact && 'Unlink'}
                    </Button>
                )}
            </div>
        );
    }

    return (
        <a
            href="https://t.me/startupkart_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group"
        >
            <div className="p-1.5 bg-blue-100 rounded-full shrink-0 group-hover:bg-blue-200 transition-colors">
                <TelegramIcon className="w-4 h-4 text-[#2AABEE]" />
            </div>
            <div className="flex-1">
                <div className="font-semibold text-blue-800 text-sm">Connect Telegram</div>
                {!compact && <div className="text-xs text-blue-600 mt-0.5">Receive OTPs & order updates instantly</div>}
            </div>
            <ExternalLink className="w-4 h-4 text-blue-500 shrink-0" />
        </a>
    );
};

export default TelegramStatusBadge;
