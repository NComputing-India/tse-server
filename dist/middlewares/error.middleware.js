export const errorMiddleware = (err, _req, res, _next) => {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    res.status(500).json({ message });
};
