import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-manage-user',
  imports: [CommonModule],
  templateUrl: './manage-user.html',
  styleUrl: './manage-user.css'
})

export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  deleteUser(email: string) {
    if (confirm('Delete this user?')) {
      this.users = this.users.filter(u => u.email !== email);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
}
