const suspiciousIps = [
    '10.0.0.1',
    '192.168.0.66',
    '123.123.123.123'
];

export const isSuspiciousIp = (ip: string): boolean => {
    return suspiciousIps.includes(ip);
};