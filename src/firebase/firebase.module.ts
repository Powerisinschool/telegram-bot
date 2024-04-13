import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseRepository } from './firebase.repository';

const firebaseProvider = {
    provide: 'FIREBASE_APP',
    useFactory: (configService: ConfigService) => {
        const firebaseConfig = {
            credential: admin.credential.cert({
                type: configService.get('FIREBASE_TYPE'),
                projectId: configService.get('FIREBASE_PROJECT_ID'),
                privateKeyId: configService.get('FIREBASE_PRIVATE_KEY_ID'),
                privateKey: configService.get('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
                clientEmail: configService.get('FIREBASE_CLIENT_EMAIL'),
                clientId: configService.get('FIREBASE_CLIENT_ID'),
                authUri: configService.get('FIREBASE_AUTH_URI'),
                tokenUri: configService.get('FIREBASE_TOKEN_URI'),
                authProviderX509CertUrl: configService.get('FIREBASE_AUTH_CERT_URL'),
                clientX509CertUrl: configService.get('FIREBASE_CLIENT_CERT_URL'),
                universeDomain: configService.get('FIREBASE_UNIVERSAL_DOMAIN'),
            } as admin.ServiceAccount),
            databaseURL: configService.get('FIREBASE_DATABASE_URL'),
            storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
        };
        return admin.initializeApp(firebaseConfig);
    },
    inject: [ConfigService],
};

@Module({
    imports: [ConfigModule],
    providers: [firebaseProvider, FirebaseRepository],
    exports: [FirebaseRepository],
})
export class FirebaseModule {}
