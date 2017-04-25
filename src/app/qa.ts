export interface QA {
    q:string;
    a:string;
    tag:string
}

interface Tag {
    q:string;
    a?:string
}

export interface ViewedQA {
    tag:Tag;
    index:number;
    bookmark:boolean;
    qOnly:boolean;
    $key?:string
} 

