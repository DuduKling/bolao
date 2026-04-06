import FingerprintJS from '@fingerprintjs/fingerprintjs';

class Fingerprint {
    static async get() {
        const isDebug = process.env.REACT_APP_DEBUG === 'true';
        if (isDebug) {
            return 'fingerprint-debug';
        }

        const fpPromise = FingerprintJS.load();

        const fp = await fpPromise;
        const result = await fp.get();

        return result.visitorId;
    }
}

export default Fingerprint;
