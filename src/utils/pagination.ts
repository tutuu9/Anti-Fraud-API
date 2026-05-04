export const getPaginationParams = (pageQuery: unknown, limitQuery: unknown) => {
    const page = Math.max(Number(pageQuery) || 1, 1);

    const limit = Math.min(Math.max(Number(limitQuery) || 10, 1), 100);

    return {
        page,
        limit
    };
};