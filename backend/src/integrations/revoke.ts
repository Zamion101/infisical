import axios from 'axios';
import * as Sentry from '@sentry/node';
import {
    IIntegrationAuth,
    IntegrationAuth,
    Integration
} from '../models';
import {
    INTEGRATION_HEROKU,
    INTEGRATION_VERCEL,
    INTEGRATION_NETLIFY
} from '../variables';

const revokeAccess = async ({
    integrationAuth,
    accessToken
}: {
    integrationAuth: IIntegrationAuth,
    accessToken: string
}) => {
    try {
        // add any integration-specific revocation logic 
        switch (integrationAuth.integration) {
            case INTEGRATION_HEROKU:
                break;
            case INTEGRATION_VERCEL:
                break;
            case INTEGRATION_NETLIFY:
                break;
        }
        
        const deletedIntegrationAuth = await IntegrationAuth.findOneAndDelete({
            _id: integrationAuth._id
        });

        if (deletedIntegrationAuth) {
			await Integration.deleteMany({
				integrationAuth: deletedIntegrationAuth._id
			});
		}
    } catch (err) {
        Sentry.setUser(null);
        Sentry.captureException(err);
        throw new Error('Failed to delete integration authorization');
    }
}

export {
    revokeAccess
}