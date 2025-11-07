import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { UserService } from './app/services/user.service';

@Component({
  selector: 'app-test',
  imports: [CommonModule],
  template: `
    <h1>User Management Test</h1>
    <button (click)="testConnection()">Test Connection</button>
    <button (click)="loadUsers()">Load Users</button>
    <button (click)="testDelete()">Test Delete</button>
    <div id="results">
      <h2>Results:</h2>
      <pre>{{ results | json }}</pre>
    </div>
  `,
  providers: []
})
export class TestComponent {
  results: any = {};

  constructor(private userService: UserService) {}

  testConnection() {
    console.log('Testing connection...');
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.results.connection = 'Success: ' + users.length + ' users found';
        console.log('Connection successful:', users);
      },
      error: (error) => {
        this.results.connection = 'Error: ' + error.message;
        console.error('Connection failed:', error);
      }
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.results.users = users;
        console.log('Users loaded:', users);
      },
      error: (error) => {
        this.results.loadError = error.message;
        console.error('Load users failed:', error);
      }
    });
  }

  testDelete() {
    // 找一個測试用戶來刪除
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        const testUser = users.find(u => u.email.includes('testuser'));
        if (testUser && testUser.id) {
          console.log('Deleting user:', testUser);
          this.userService.deleteUser(testUser.id).subscribe({
            next: () => {
              this.results.deleteTest = 'User deleted successfully: ' + testUser.name;
              console.log('Delete successful');
            },
            error: (error) => {
              this.results.deleteTest = 'Delete failed: ' + error.message;
              console.error('Delete failed:', error);
            }
          });
        } else {
          this.results.deleteTest = 'No test user found to delete';
        }
      }
    });
  }
}

bootstrapApplication(TestComponent, {
  providers: [
    provideHttpClient(withFetch())
  ]
});
