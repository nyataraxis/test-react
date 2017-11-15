import superagent from 'superagent';
import config from '../config/config';

export default function apiClient(method, path, { params, data } = {}) {
    const { api: { url: apiUrl } } = config;

    return new Promise((resolve, reject) => {
        const url = `${apiUrl}/${path}`;

        const request = superagent[method](url);

        if (params) {
            request.query(params);
        }

        if (data) {
            request.send(data);
        }

        request.end((err, { body, header, status } = {}) => {
            const error = body || err;

            return err
                ? reject({ ...error, status })
                : resolve(body, status);
        });
    });
}
