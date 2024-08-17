import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import axios from "axios"

export interface UserProfile {
  name: string
}

export function ProfileScreen({ user }: { user: UserProfile }) {
const getHistory = async (name:string) => {
  const url = process.env.NEXT_PUBLIC_HISTORY_API_URL + `?id=tst&type=history&p=${name}&teammateData=1`;
  const response = await axios.get(url);
  console.log(response.data);
  return response
}

getHistory(user.name);


  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-8 max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-6">
        <Avatar className="w-28 h-28">
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="grid gap-2 text-center">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sky-300 dark:text-sky-200">@{user.name}</p>
          <p className="text-sm leading-relaxed text-sky-300 dark:text-sky-200">
            Passionate gamer and community member. Loves playing RPGs and strategy games.
          </p>
        </div>
      </div>
      <div className="grid gap-8">
        <Tabs className="w-full" defaultValue="overview">
          <TabsList className="flex border-b">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="match-history">Match History</TabsTrigger>
            <TabsTrigger value="linked-ids">Linked Accounts</TabsTrigger>
          </TabsList>
          <TabsContent className="pt-6" value="overview">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <h3 className="text-lg font-medium">About</h3>
                <p className="text-sky-300 dark:text-sky-200">
                  Jared is an avid gamer who has been part of the community for over 5 years. He enjoys playing a
                  variety of games, from role-playing to strategy titles.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-medium">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Completed 100 quests</Badge>
                  <Badge variant="secondary">Reached level 50 in RPG</Badge>
                  <Badge variant="secondary">Won 25 strategy game tournaments</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent className="pt-6" value="match-history">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Recent Matches</h3>
                  <Link className="text-sm text-gray-900 hover:underline dark:text-sky-30" href="#">
                    View all
                  </Link>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>League of Legends</TableCell>
                      <TableCell>Victory</TableCell>
                      <TableCell>April 25, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dota 2</TableCell>
                      <TableCell>Defeat</TableCell>
                      <TableCell>April 22, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Overwatch</TableCell>
                      <TableCell>Victory</TableCell>
                      <TableCell>April 18, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Counter-Strike: Global Offensive</TableCell>
                      <TableCell>Defeat</TableCell>
                      <TableCell>April 15, 2023</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Leaderboard</h3>
                  <Link className="text-sm text-gray-900 hover:underline dark:text-sky-30" href="#">
                    View all
                  </Link>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Jared Palmer</TableCell>
                      <TableCell>12,345</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Olivia Davis</TableCell>
                      <TableCell>11,987</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Michael Johnson</TableCell>
                      <TableCell>10,654</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>Emily Parker</TableCell>
                      <TableCell>9,876</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
