/** Shells que puede imitar la terminal del footer. */
export type Shell = 'ps' | 'kali' | 'cmd';

/** Un comando escrito en la sintaxis de cada shell. */
export type ShellCommands = Record<Shell, string>;
