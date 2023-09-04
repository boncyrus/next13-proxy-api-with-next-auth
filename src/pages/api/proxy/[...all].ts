import { authOptions } from '@/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import httpProxyMiddleware from 'next-http-proxy-middleware';

// This is required to let next know that we are not using the built-in body parser
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

const proxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const target = process.env.API_URL;
    // Get token from session
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await httpProxyMiddleware(req, res, {
        target: target,
        changeOrigin: true,
        headers: {
            // Authorization: `Bearer ${accessToken}`, extract access token from session which is handled in authOptions
        },
        pathRewrite: [
            {
                patternStr: '^/api/proxy', // This path will be replaced once the proxy forwards it to the target
                replaceStr: '',
            },
        ],
    });
};

export default proxyHandler;
