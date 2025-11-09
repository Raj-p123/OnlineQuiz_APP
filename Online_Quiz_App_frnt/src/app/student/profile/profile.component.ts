import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';
import { UserProfile } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student: UserProfile = {} as UserProfile;
  editableStudent: UserProfile = {} as UserProfile;
  isEditing = false;

  constructor(private studentService: StudentService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const studentId = Number(localStorage.getItem('studentId'));
      if (studentId) {
        this.studentService.getStudentById(studentId).subscribe(student => {
          this.student = student;
          this.editableStudent = { ...student };
        });
      }
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    this.studentService.updateStudent(this.editableStudent).subscribe(updatedStudent => {
      this.student = updatedStudent;
      this.isEditing = false;
    });
  }
}
