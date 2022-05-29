import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members:Member[];
  pagination: Pagination;
  userParams: UserParams;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  constructor(private _memberService: MembersService) {
    this.userParams = this._memberService.getUserParams();
   }

  ngOnInit(): void {
   this.loadMembers();
  }

  loadMembers() {
    this._memberService.setUserParams(this.userParams);
    this._memberService.getMembers(this.userParams)
    .subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters() {
    this.userParams = this._memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this._memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
