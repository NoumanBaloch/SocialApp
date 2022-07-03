import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input() member: Member;
  constructor(private _memberService: MembersService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this._memberService.addLike(member.username).subscribe(() => {
      this._toastrService.success("You have liked " + member.knownAs);
    })
  }

}
