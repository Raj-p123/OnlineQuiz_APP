import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../teacher.service';
import { UserProfile } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  teacher: UserProfile = {} as UserProfile;
  editableTeacher: UserProfile = {} as UserProfile;
  isEditing = false;

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    const teacherId = Number(localStorage.getItem('teacherId'));
    this.teacherService.getTeacherById(teacherId).subscribe(teacher => {
      this.teacher = teacher;
      this.editableTeacher = { ...teacher };
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    this.teacherService.updateTeacher(this.editableTeacher).subscribe(updatedTeacher => {
      this.teacher = updatedTeacher;
      this.isEditing = false;
    });
  }
}
