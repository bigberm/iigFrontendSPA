import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../viewmodel/userregister';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.apiUrl;
    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ) {}
    createRegisterUser(modelData: UserRegister): Observable<any> {
        const formData: FormData = new FormData();
        let fileToUpload = <File>modelData.ProfileImage;
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('ConfirmPassword', modelData.ConfirmPassword);
        formData.append('Email', modelData.Email);
        formData.append('FirstName', modelData.FirstName);
        formData.append('LastName', modelData.LastName);
        formData.append('Password', modelData.Password);
        formData.append('UserName', modelData.UserName);

        return this.http.post<any>(
            this.baseUrl + 'api/Account/Register',
            formData
        );
    }
    getUserInfo(userId: string): Observable<any> {
        var data = 'userId=' + userId;
        return this.http.get<any>(
            this.baseUrl + 'api/Account/GetUserInfo?' + data
        );
    }
    uploadImageFile(files: File, userId: string): Observable<any> {
        const formData: FormData = new FormData();
        let fileToUpload = <File>files[0];
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('userId', userId);

        return this.http.post(
            this.baseUrl + 'Api/Account/UploadProfileImage',
            formData
        );
    }

    getProfileImage(userId: string): Observable<any> {
        var data = 'userId=' + userId;
        return this.http.get(
            this.baseUrl + 'Api/Account/GetProfileImage?' + data,
            { responseType: 'blob' }
        );
    }
}
